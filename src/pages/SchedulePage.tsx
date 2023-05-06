import { Button } from '@mantine/core';
import { Questionnaire, Schedule } from '@medplum/fhirtypes';
import { DrAliceSmithSchedule, ExampleQuestionnaire } from '@medplum/mock';
import {Document, Scheduler, useMedplum } from '@medplum/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function SchedulePage(): JSX.Element {
  const navigate = useNavigate();
  const medplum = useMedplum();
  const test_resource = medplum.readResource('Schedule','f83ec14c-cc12-410a-8f66-71af3e1d3273').read() as Schedule;
  const test_ques = medplum.readResource('Questionnaire','6ccaae43-47dd-4ee6-934c-7adc4a30affc').read() as Questionnaire;
  console.log(test_ques)
  return(
  <Document>
    <Scheduler schedule={test_resource} questionnaire={test_ques} />
    </Document>
  );
}
