import { Button } from '@mantine/core';
import { Questionnaire, Schedule } from '@medplum/fhirtypes';
import { DrAliceSmithSchedule, ExampleQuestionnaire } from '@medplum/mock';
import {Document, Scheduler, useMedplum } from '@medplum/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function SchedulePage(): JSX.Element {
  const navigate = useNavigate();
  const medplum = useMedplum();
  const test_resource = medplum.readResource('Schedule','49e2a3c4-a517-46f0-a893-660e243c55dc').read() as Schedule;
  const test_ques = medplum.readResource('Questionnaire','cbd1ca29-2202-4958-a4e8-b92a6eb5726d').read() as Questionnaire;
  console.log(test_ques)
  return(
  <Document>
    <Scheduler schedule={test_resource} questionnaire={test_ques} />
    </Document>
  );
}
