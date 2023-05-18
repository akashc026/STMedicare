import React, { useState, useEffect } from 'react';
import { Document } from '@medplum/react';
import { useMedplum } from '@medplum/react';
import { NewFormpatient } from './NewFormpatient.mjs';

function RegisterNewPatient(props) {
    const { type, projectId, googleClientId, onSuccess } = props;
    const medplum = useMedplum();
    const [login, setLogin] = useState(undefined);
    const [outcome, setOutcome] = useState();
    useEffect(() => {
        if (type === 'patient' && login) {
            medplum
                .startNewPatient({ login, projectId: projectId })
                .then((response) => medplum.processCode(response.code))
                .then(() => onSuccess())
                .catch((err) => setOutcome(err));
        }
    }, [medplum, type, projectId, login, onSuccess]);
    function handleAuthResponse(response) {
        if (response.code) {
            medplum
                .processCode(response.code)
                .then(() => onSuccess())
                .catch(console.log);
        }
        else if (response.login) {
            setLogin(response.login);
        }
    }
    return (React.createElement(Document, { width: 450 },
        outcome && React.createElement("pre", null, JSON.stringify(outcome, null, 2)),
        !login && (React.createElement( NewFormpatient , { projectId: projectId, googleClientId: googleClientId, handleAuthResponse: handleAuthResponse }, props.children))));
}

export { RegisterNewPatient };
//# sourceMappingURL=RegisterForm.mjs.map
