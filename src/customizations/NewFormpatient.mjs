import { Center, Group, Divider, Stack, TextInput, PasswordInput, Text, Anchor, Checkbox, Button } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { Form } from '@medplum/react';
import { useMedplum } from '@medplum/react';
import { OperationOutcomeAlert } from '@medplum/react';
import { getIssuesForExpression, getErrorsForInput } from '@medplum/react';

function NewFormpatient(props) {
    const medplum = useMedplum();
    const [outcome, setOutcome] = useState();
    const issues = getIssuesForExpression(outcome, undefined);
   
    return (React.createElement(Form, { style: { maxWidth: 400 }, onSubmit: async (formData) => {
            try {
                
                props.handleAuthResponse(await medplum.startNewUser({
                    projectId: props.projectId,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    remember: formData.remember === 'true',
                }));
            }
            catch (err) {
                setOutcome(err);
            }
        } },
        React.createElement(Center, { sx: { flexDirection: 'column' } }, props.children),
        React.createElement(OperationOutcomeAlert, { issues: issues }),
        React.createElement(Stack, { spacing: "xl" },
            React.createElement(TextInput, { name: "firstName", type: "text", label: "First name", placeholder: "First name", required: true, autoFocus: true, error: getErrorsForInput(outcome, 'firstName') }),
            React.createElement(TextInput, { name: "lastName", type: "text", label: "Last name", placeholder: "Last name", required: true, error: getErrorsForInput(outcome, 'lastName') }),
            React.createElement(TextInput, { name: "email", type: "email", label: "Email", placeholder: "name@domain.com", required: true, error: getErrorsForInput(outcome, 'email') }),
            React.createElement(PasswordInput, { name: "password", label: "Password", autoComplete: "off", required: true, error: getErrorsForInput(outcome, 'password') }),
            React.createElement(Text, { color: "dimmed", size: "xs" },
                "By clicking submit you agree to the Medplum",
                ' ',
                React.createElement(Anchor, { href: "https://www.medplum.com/privacy" }, "Privacy\u00A0Policy"),
                ' and ',
                React.createElement(Anchor, { href: "https://www.medplum.com/terms" }, "Terms\u00A0of\u00A0Service"),
                "."),
            React.createElement(Text, { color: "dimmed", size: "xs" },
                "This site is protected by reCAPTCHA and the Google",
                ' ',
                React.createElement(Anchor, { href: "https://policies.google.com/privacy" }, "Privacy\u00A0Policy"),
                ' and ',
                React.createElement(Anchor, { href: "https://policies.google.com/terms" }, "Terms\u00A0of\u00A0Service"),
                " apply.")),
        React.createElement(Group, { position: "apart", mt: "xl", noWrap: true },
            React.createElement(Checkbox, { name: "remember", label: "Remember me", size: "xs" }),
            React.createElement(Button, { type: "submit" }, "Create account"))));
}

export { NewFormpatient };
//# sourceMappingURL=NewUserForm.mjs.map
