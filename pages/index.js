import Head from "next/head";
import Layout from "@/components/Layout";
import Registration from "./registration";
import EventsLayout from "@/components/EventsLayout";
import { useState } from "react";
import appContext from "@/context/appContext";
import { formatDate } from "@/helpers/util";
import _ from 'lodash';



export default function Home({registrations}) {

  const [eventRegistrations, setEventRegistrations] = useState(registrations);

  return (
    <>
      <Head>
        <title>STA Dashboard</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <appContext.Provider value = {{
        registrations : eventRegistrations,
        setEventRegistrations : setEventRegistrations
      }}>
        <Layout>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
              <EventsLayout />
            </div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              <Registration />
            </div>
          </div>
        </Layout>
      </appContext.Provider>
      </main>
    </>
  );
}

function prepareForSerializatoin(obj) {
  return obj.mapValues(obj, value => typeof value === 'undefined' ? null : value);
}

export async function getServerSideProps(){
  const response = await fetch("http://localhost:3000/api/registrations");
  const registrations = await response.json();
  const dateWithoutTime = new Date();
  dateWithoutTime.setHours(0,0,0,0);
  const dateString = formatDate(dateWithoutTime)+"T00:00:00.000Z";
  if (registrations && Array.isArray(registrations)) {
    for (let reg of registrations) {
      // Get attendance details
      const queryParams = "registrationID=" + reg.RegistrationID + "&eventDate=" + dateString;
      const attendance = await fetch("http://localhost:3000/api/attendance?" + queryParams);
      if(attendance){
        const attendanceJson = await attendance.json();
        reg.attendance = attendanceJson;
      }
      // Get Crew name
      const queryParams2 = "registrationID=" + reg.RegistrationID;
      const crew = await fetch("http://localhost:3000/api/crews?" + queryParams2);
      if (crew) {
        try {
          const crewJson = await crew.json();
          
            reg.crew = crewJson;
          
        }catch(error){
          console.log(error);
        }
      }
      
    }
  }
  return {
      props : {
        registrations : registrations
      }
    
  }
}