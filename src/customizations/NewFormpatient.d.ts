import { LoginAuthenticationResponse } from '@medplum/core';
import React from 'react';
export interface NewUserFormProps {
    readonly projectId: string;
    readonly googleClientId?: string;
    readonly children?: React.ReactNode;
    readonly handleAuthResponse: (response: LoginAuthenticationResponse) => void;
}
export declare function NewFormpatient(props: NewUserFormProps): JSX.Element;