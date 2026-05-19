'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckSquare } from 'lucide-react';

interface TasksCardProps {
  tasks: string[];
}

export function TasksCard({ tasks }: TasksCardProps) {
  const [checked, setChecked] = useState<boolean[]>(tasks.map(() => false));

  const toggle = (index: number) => {
    setChecked(prev => prev.map((v, i) => (i === index ? !v : v)));
  };

  const completedCount = checked.filter(Boolean).length;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="text-primary" size={20} />
          Mandatory Tasks
        </CardTitle>
        <CardDescription>
          {completedCount}/{tasks.length} tasks completed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              onClick={() => toggle(index)}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <Checkbox
                id={`task-${index}`}
                checked={checked[index]}
                onCheckedChange={() => toggle(index)}
                className="mt-0.5"
              />
              <Label
                htmlFor={`task-${index}`}
                className={`text-sm cursor-pointer leading-snug ${checked[index] ? 'line-through text-muted-foreground' : ''}`}
              >
                {task}
              </Label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
