import { AppShell } from '@mantine/core';
import { ErrorBoundary, useMedplum } from '@medplum/react';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HeaderBar } from './components/HeaderBar';
import { Loading } from './components/Loading';
import { CarePlansList } from './pages/CarePlansList';
import { AppointmentList } from './pages/AppointmentList';
import { CreateResourcePage } from './pages/CreateResourcePage';
import { FormsList } from './pages/FormsList';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { PatientPage } from './pages/PatientPage';
import { PatientsList } from './pages/PatientsList';
import { PlanDefinitionPage } from './pages/PlanDefinitionPage';
import { Messages } from './pages/MessagesPage';
import { ProfilePage } from './pages/ProfilePage';
import { QuestionnairePage } from './pages/QuestionnairePage';
import { ReportsPage } from './pages/ReportsPage';
import { ResourcePage } from './pages/ResourcePage';
import { ResourceSearchPage } from './pages/ResourceSearchPage';
import { SchedulePage } from './pages/SchedulePage';
import { SignInPage } from './pages/SignInPage';
import { TaskPage } from './pages/TaskPage';
import { Register } from './pages/Register';
import { UpdateResourcePage } from './pages/UpdatesResourcePage';
import { Measurement } from './pages/Measurement';
import { Footer } from './components/Footer';


export function App(): JSX.Element | null {
  const medplum = useMedplum();

  if (medplum.isLoading()) {
    return null;
  }

  const profile = medplum.getProfile();
  return (
    <AppShell fixed={true} header={profile && <HeaderBar />} footer={profile && <Footer/>}>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
          <Route path="/" element={profile?.resourceType == "Practitioner" ? <HomePage /> : <LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/forms" element={<FormsList />} />
            <Route path="/careplans" element={<CarePlansList />} />
            <Route path="/messagepage" element={< Messages/>} />
            <Route path="/:measurementId" element={<Measurement />} />
            <Route path="/appointment" element={<AppointmentList />} />
            <Route path="/:resourceType/new" element={<CreateResourcePage />} />
            <Route path="/:resourceType/edit/:id" element={<UpdateResourcePage />} />
            <Route path="/Patient/:id/:tab/:resourceId" element={<PatientPage />} />
            <Route path="/Patient/:id/:tab" element={<PatientPage />} />
            <Route path="/Patient/:id" element={<PatientPage />} />
            <Route path="/PlanDefinition/:id/:tab" element={<PlanDefinitionPage />} />
            <Route path="/PlanDefinition/:id" element={<PlanDefinitionPage />} />
            <Route path="/Questionnaire/:id/:tab" element={<QuestionnairePage />} />
            <Route path="/Questionnaire/:id" element={<QuestionnairePage />} />
            <Route path="/Task/:id" element={<TaskPage />} />
            <Route path="/:resourceType" element={<ResourceSearchPage />} />
            <Route path="/:resourceType/:id" element={<ResourcePage />} />
            <Route path="/:resourceType/:id/:tab" element={<ResourcePage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AppShell>
  );
}
