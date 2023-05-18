import React from 'react';
export interface RegisterFormProps {
    readonly type: 'patient' | 'project';
    readonly projectId?: string;
    readonly googleClientId?: string;
    readonly children?: React.ReactNode;
    readonly onSuccess: () => void;
}
export declare function RegisterNewPatient(props: RegisterFormProps): JSX.Element;