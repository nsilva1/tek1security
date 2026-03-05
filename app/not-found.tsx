import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <h1 className="text-8xl font-black text-primary mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="flex gap-4">
                <Button size="lg" asChild>
                    <Link href="/">Return Home</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">Contact Support</Link>
                </Button>
            </div>
        </div>
    );
}
