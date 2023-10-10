import React , {useEffect, useState} from 'react'
import axios from "axios";
import '../App.css'
import { useNavigate } from 'react-router-dom';



export default function AddEvents() {

    const navigate = useNavigate()

   const [addEvent,setAddEvent] = useState(false)
   const [seeEvent,setSeeEvent] = useState(false)
   const [seeProfile, setSeeProfile] = useState(false)
   const [data,setData] = useState([])


    const [summary, setSummary] = useState(null);
    const [description, setDescription] = useState(null);
    const [location, setLocation] = useState(null);
    const [startDateTime, setStartDateTime] = useState(null);
    const [endDateTime, setEndDateTime] = useState(null);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(summary, description, location, startDateTime, endDateTime);
      axios
        .post("/api/create-event", {
          summary,
          description,
          location,
          startDateTime,
          endDateTime,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
        setDescription('')
        setSummary('')
        setEndDateTime('')
        setLocation('')
        setStartDateTime('')
    };
  
    const handleAddEvents = ()=>{
      setAddEvent(true)
      setSeeEvent(false)
    }

    const handleSeeEvents = ()=>{
      axios.get('/api/get-events')
      .then((response)=>{
        console.log(response)
        setData(response.data)
        setSeeEvent(true)
      })
    }
    // const handleProfile = ()=>{
    //   axios.get('/api/user/profile')
    //   .then((response)=>{
    //     console.log(response)
    //     //navigate('/profile',{state:response})
    //   })
    //   .catch(error=>console.log(error))
    // }

    // useEffect(()=>{
    //   setSeeEvent(true)
    // },[data])

    function Dateparser(dateString){
      const date = new Date(dateString).toLocaleDateString()
      
      const time = new Date(dateString).toLocaleTimeString()
      return date + " " + time
    }
  
    return (
      <div className="app">
        {
          !addEvent && !seeEvent && (
            <div>
              <button onClick={handleAddEvents}>Add A Event to Calendar</button>
              <button onClick={handleSeeEvents}>See All Events in Calendar</button>
              {/* <button onClick={handleProfile}>Attendee Profile </button> */}
            </div>
          )
        }
     
          {addEvent && (<div>
            <h1>Add Event to the Google Calendar</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="summary">Summary</label>
              <br />
              <input
                type="text"
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <br />
              <label htmlFor="description">Description</label>
              <br />
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <label htmlFor="location">Location</label>
              <br />
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <br />
              <label htmlFor="startDateTime">Start Date Time</label>
              <br />
              <input
                type="datetime-local"
                id="startDateTime"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
              />
              <br />
              <label htmlFor="endDateTime">End Date Time</label>
              <br />
              <input
                type="datetime-local"
                id="endDateTime"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
              />
              <br />
              <button type="submit">Create Event</button>
            </form>
           
          </div>)}
        
        {seeEvent && (
          <div className='Main_Event_Div'>
            <div className='Eevent_Heading'>
            <h1>Events In Google Calendar</h1>
            </div>
        {data.length > 0 ? data.map((item,index)=>{
            return (<ul className="event-details">
              <div className='Event_Number'><h3>Event Number : {index+1}</h3></div>
              <div className='event_list'>
            <li><span>Event Name : </span>  {item.summary}</li>
            <li><span>Event Description : </span>  {item.description}</li>
            <li><span>Event Start Time : </span>  {Dateparser(item.start.dateTime)}</li>
            <li><span>Event Location : </span>  {item.location}</li>
            </div>
            </ul>)
        }) : <h3>No events in calendar</h3>}
    
          </div>
        )}
      </div>
    );
}
