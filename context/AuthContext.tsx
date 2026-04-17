'use client'

import {
	createContext,
	useContext,
	useEffect,
	useState,
    // useCallback,
	type ReactNode,
} from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	// sendEmailVerification,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
    updateProfile,
	type User,
	type UserCredential,
} from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import type { IUser, INewUser } from '../interface/user_interface';
import { useToast } from '@/hooks/use-toast';
import { getFriendlyErrorMessage } from '@/lib/helper_functions';

interface AuthContextType {
	currentUser: User | null;
	loading: boolean;
	userInfo: IUser | null;
	signup: (userData: INewUser) => Promise<UserCredential | undefined>;
	login: (email: string, password: string) => Promise<UserCredential | undefined>;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	loginWithGoogle: () => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { success, error } = useToast()

	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<IUser | null>(null);

	const signup = async (userData: INewUser) => {
        const { email, password, firstName, lastName, role, company, profileImage, phoneNumber } = userData;

        if (!email || !password || !firstName || !lastName || !role || !company || !phoneNumber) {
            error("Please fill in all the required fields");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(userCredential.user, {
                displayName: `${firstName} ${lastName}`,
                photoURL: profileImage,
            });
            
            const user: IUser = {
                id: userCredential.user.uid,
                firstName,
                lastName,
                email,
                role,
                company,
                profileImage,
                phoneNumber,
            };

            await setDoc(doc(db, 'users', userCredential.user.uid), {
                ...user,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            
            success("User created successfully");
            return userCredential;
		
        } catch (error: any) {
            error(getFriendlyErrorMessage(error.code));
            throw error;
        } finally {
            setLoading(false)
        }
		
	};

	const login = async (email: string, password: string) => {
        if (!email || !password) {
            error("Please fill in all the required fields");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            success("User logged in successfully");
            return userCredential;
        } catch (error: any) {
            error(getFriendlyErrorMessage(error.code));
            throw error;
        } finally {
            setLoading(false)
        }
    }

	const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        const user = res.user;

        // Check if firestore record exists
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                id: user.uid,
                name: user.displayName || 'New User',
                email: user.email,
                role: 'client', // Default role
                profileImage: user.photoURL || '',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        }
        return res;
    };

	const logout = () => signOut(auth);

	const resetPassword = async (email: string) =>
		sendPasswordResetEmail(auth, email);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (currentUser) => {
            setCurrentUser(currentUser);

			if (currentUser) {
				const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                        
				if (userDoc.exists()) {
                    const userData = userDoc.data();

					setUserInfo({
						...userData,
						id: currentUser.uid,
                        createdAt: userData.createdAt?.toDate?.().toISOString() || userData.createdAt,
                        updatedAt: userData.updatedAt?.toDate?.().toISOString() || userData.updatedAt,
					} as IUser);
				}
			} else {
				setUserInfo(null);
			}

			setLoading(false);
		});
		return () => unsub();
	}, []);

	const value: AuthContextType = {
		currentUser,
		loading,
		userInfo,
		signup,
		login,
		logout,
		resetPassword,
		loginWithGoogle,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
