import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

const [profile, setProfile] = useState(() => {
  const savedProfile = localStorage.getItem("campusConnectProfile");

  return savedProfile
    ? JSON.parse(savedProfile)
    : {
        name: "Organizer Name",
        email: "organizer@campusconnect.com",
      };
});
  const [feedbacks, setFeedbacks] = useState(() => {
  const saved = localStorage.getItem("campusConnectFeedbacks");

  return saved
    ? JSON.parse(saved)
    : [
        {
          name: "Rahul",
          rating: 5,
          comment: "The event was very well organized!",
        },
        {
          name: "Priya",
          rating: 4,
          comment: "Great experience and helpful volunteers.",
        },
        {
          name: "Neha",
          rating: 5,
          comment: "Looking forward to the next event.",
        },
      ];
});

useEffect(() => {
  localStorage.setItem(
    "campusConnectFeedbacks",
    JSON.stringify(feedbacks)
  );
}, [feedbacks]);
  const [eventSearch, setEventSearch] = useState("");
  const [eventStatusFilter, setEventStatusFilter] = useState("All");
  const [editingEvent, setEditingEvent] = useState(null);
  const [participantSearch, setParticipantSearch] = useState("");

  const [newEvent, setNewEvent] = useState({
  name: "",
  category: "",
  date: "",
  time: "",
  venue: "",
  maxParticipants: "",
  description: "",
});
  const menuItems = [
    "Dashboard",
    "My Events",
    "Create Event",
    "Participants",
    "Announcements",
    "Analytics",
    "Feedback",
    "Profile & Settings",
  ];

  const [events, setEvents] = useState(() => {
  const savedEvents = localStorage.getItem("campusConnectEvents");

  return savedEvents ? JSON.parse(savedEvents) : [
    {
      name: "Tech Innovators 2026",
      category: "Technology",
      date: "12 Oct 2026",
      registrations: 128,
      status: "Published",
    },
    {
      name: "Inter-College Debate",
      category: "Competition",
      date: "18 Oct 2026",
      registrations: 76,
      status: "Published",
    },
    {
      name: "Campus Photography Walk",
      category: "Cultural",
      date: "24 Oct 2026",
      registrations: 42,
      status: "Draft",
    },
    {
      name: "Startup Pitch Day",
      category: "Business",
      date: "02 Nov 2026",
      registrations: 91,
      status: "Published",
    },
   ];
});
useEffect(() => {
  localStorage.setItem("campusConnectEvents", JSON.stringify(events));
}, [events]);

 const [participants, setParticipants] = useState(() => {
  const emailByName = {
    "Aarav Sharma": "aarav.sharma@example.com",
    "Ananya Patil": "ananya.patil@example.com",
    "Rohan Mehta": "rohan.mehta@example.com",
    "Ishita Kulkarni": "ishita.kulkarni@example.com",
  };

  const defaultParticipants = [
    {
      name: "Aarav Sharma",
      email: emailByName["Aarav Sharma"],
      event: "Tech Innovators 2026",
      status: "Registered",
    },
    {
      name: "Ananya Patil",
      email: emailByName["Ananya Patil"],
      event: "Inter-College Debate",
      status: "Attended",
    },
    {
      name: "Rohan Mehta",
      email: emailByName["Rohan Mehta"],
      event: "Startup Pitch Day",
      status: "Registered",
    },
    {
      name: "Ishita Kulkarni",
      email: emailByName["Ishita Kulkarni"],
      event: "Tech Innovators 2026",
      status: "Registered",
    },
  ];

  const savedParticipants = localStorage.getItem("campusParticipants");

  if (!savedParticipants) {
    return defaultParticipants;
  }

  try {
    return JSON.parse(savedParticipants).map((person) => ({
      ...person,
      email: person.email || emailByName[person.name] || "",
    }));
  } catch {
    return defaultParticipants;
  }
});
useEffect(() => {
  localStorage.setItem("campusParticipants", JSON.stringify(participants));
}, [participants]);

  const [announcements, setAnnouncements] = useState(() => {
  const saved = localStorage.getItem("campusConnectAnnouncements");

  return saved
    ? JSON.parse(saved)
    : [
        {
          title: "Venue updated for Tech Innovators",
          audience: "Registered participants",
          date: "Today",
        },
        {
          title: "Registration deadline extended",
          audience: "All students",
          date: "Yesterday",
        },
        {
          title: "Volunteers meeting at 4 PM",
          audience: "Event volunteers",
          date: "2 days ago",
        },
      ];
});

useEffect(() => {
  localStorage.setItem(
    "campusConnectAnnouncements",
    JSON.stringify(announcements)
  );
}, [announcements]);

  const renderDashboard = () => (
    <>
      <div className="welcome-section">
        <div>
          <h1>Welcome, Organizer 👋</h1>
          <p>Here's what's happening with your events today.</p>
        </div>
        <button
          className="primary-button"
          onClick={() => {
  setEditingEvent(null);
  setActivePage("Create Event");
}}
        >
          + Create Event
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div>
           <p>Total Events</p>
<h2>{events.length}</h2>
<span className="positive">All created events</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div>
           <p>Registrations</p>
<h2>
  {events.reduce(
    (total, event) => total + Number(event.registrations || 0),
    0
  )}
</h2>
<span className="positive">Across all events</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div>
            <p>Upcoming Events</p>
<h2>
  {events.filter((event) => event.status === "Published").length}
</h2>
<span>Published events</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div>
            <p>Pending Tasks</p>
            <h2>7</h2>
            <span className="warning">Needs attention</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2>Upcoming Events</h2>
            <button onClick={() => setActivePage("My Events")}>View all</button>
          </div>

          {events.slice(0, 3).map((event, index) => (
            <div className="event-row" key={index}>
              <div className="date-box">
                <strong>{event.date.split(" ")[0]}</strong>
                <small>{event.date.split(" ")[1]}</small>
              </div>

              <div className="event-info">
                <h3>{event.name}</h3>
                <p>{event.category} • {event.registrations} registrations</p>
              </div>

              <span className={`status ${event.status.toLowerCase()}`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Quick Actions</h2>
          </div>

          <div className="quick-actions">
            <button onClick={() => setActivePage("Create Event")}>
              <span>➕</span>
              <div>
                <strong>Create Event</strong>
                <small>Start a new event</small>
              </div>
            </button>

            <button onClick={() => setActivePage("Announcements")}>
              <span>📢</span>
              <div>
                <strong>Announcement</strong>
                <small>Notify students</small>
              </div>
            </button>

            <button onClick={() => setActivePage("Participants")}>
              <span>👥</span>
              <div>
                <strong>Participants</strong>
                <small>View registrations</small>
              </div>
            </button>

            <button onClick={() => setActivePage("Analytics")}>
              <span>📊</span>
              <div>
                <strong>View Analytics</strong>
                <small>Check event performance</small>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="card checklist-card">
        <div className="card-header">
          <div>
            <h2>Event Readiness</h2>
            <p>Tech Innovators 2026</p>
          </div>
          <span className="progress-text">75% Ready</span>
        </div>

        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>

        <div className="checklist">
          <label>
            <input type="checkbox" defaultChecked />
            Event details completed
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Venue confirmed
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Registration opened
          </label>

          <label>
            <input type="checkbox" />
            Volunteers assigned
          </label>
        </div>
      </div>
    </>
  );

  const renderMyEvents = () => (
    <div>
      <div className="page-title">
        <div>
          <h1>My Events</h1>
          <p>Manage all the events you are organizing.</p>
        </div>
        <button
  className="primary-button"
  onClick={() => {
    setEditingEvent(null);
    setNewEvent({
      name: "",
      category: "",
      date: "",
      time: "",
      venue: "",
      maxParticipants: "",
      description: "",
    });
    setActivePage("Create Event");
  }}
>
  + Create Event
</button>
      </div>

      <div className="card">
        <div className="search-box">
          🔍
          <input
  placeholder="Search events..."
  value={eventSearch}
  onChange={(e) => setEventSearch(e.target.value)}
/>
<select
  value={eventStatusFilter}
  onChange={(e) => setEventStatusFilter(e.target.value)}
>
  <option value="All">All Events</option>
  <option value="Published">Published</option>
  <option value="Draft">Drafts</option>
</select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Category</th>
                <th>Date</th>
                <th>Registrations</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {events
  .filter((event) =>
    event.name.toLowerCase().includes(eventSearch.toLowerCase()) &&
  (eventStatusFilter === "All" || event.status === eventStatusFilter)
  )
  .map((event, index) => (
                <tr key={index}>
                  <td><strong>{event.name}</strong></td>
                  <td>{event.category}</td>
                  <td>{event.date}</td>
                  <td>{event.registrations}</td>
                  <td>
                    <span className={`status ${event.status.toLowerCase()}`}>
                      {event.status}
                    </span>
                  </td>
                  <td>

<button
  className="small-button manage-button"
  onClick={() => {
    setEditingEvent(event);

setNewEvent({
  name: event.name || "",
  category: event.category || "",
  date:
  event.date && !isNaN(new Date(event.date).getTime())
    ? new Date(event.date + (event.date.includes("T") ? "" : " 00:00:00"))
        .toLocaleDateString("sv-SE")
    : "",
  time: event.time || "",
  venue: event.venue || "",
  maxParticipants: event.maxParticipants || "",
  description: event.description || "",
});

    setActivePage("Create Event");
  }}
>
  Manage
</button>

                    <button
  className="delete-button"
  onClick={() => {
    if (window.confirm(`Delete ${event.name}?`)) {
      setEvents((previousEvents) =>
        previousEvents.filter((item) => item !== event)
      );
    }
  }}
>
  Delete
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCreateEvent = () => (
  <div>
    <div className="page-title">
      <div>
        <h1>{editingEvent ? "Edit Event" : "Create New Event"}</h1>
<p>
  {editingEvent
    ? "Update the details of your existing event."
    : "Fill in the details to create your event."}
</p>
      </div>
    </div>

    <div className="card form-card">
      <div className="form-grid">
        <div className="form-group">
          <label>Event Name</label>
          <input
  id="eventName"
  placeholder="Enter event name"
  value={newEvent.name}
  onChange={(e) =>
    setNewEvent({ ...newEvent, name: e.target.value })
  }
/>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
  id="eventCategory"
  value={newEvent.category}
  onChange={(e) =>
    setNewEvent({ ...newEvent, category: e.target.value })
  }
>
  <option value="">Select category</option>
  <option value="Technology">Technology</option>
  <option value="Competition">Competition</option>
  <option value="Cultural">Cultural</option>
  <option value="Sports">Sports</option>
  <option value="Business">Business</option>
</select>
        </div>

        <div className="form-group">
          <label>Date</label>
         <input
  id="eventDate"
  type="date"
  value={newEvent.date}
  onChange={(e) =>
    setNewEvent({ ...newEvent, date: e.target.value })
  }
/>
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
  id="eventTime"
  type="time"
  value={newEvent.time}
  onChange={(e) =>
    setNewEvent({ ...newEvent, time: e.target.value })
  }
/>
        </div>

        <div className="form-group">
          <label>Venue</label>
          <input
  id="eventVenue"
  placeholder="Enter venue"
  value={newEvent.venue}
  onChange={(e) =>
    setNewEvent({ ...newEvent, venue: e.target.value })
  }
/>
        </div>

        <div className="form-group">
          <label>Maximum Participants</label>
          <input
  id="eventParticipants"
  type="number"
  placeholder="100"
  value={newEvent.maxParticipants}
  onChange={(e) =>
    setNewEvent({ ...newEvent, maxParticipants: e.target.value })
  }
/>
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
  id="eventDescription"
  rows="5"
  placeholder="Describe your event..."
  value={newEvent.description}
  onChange={(e) =>
    setNewEvent({ ...newEvent, description: e.target.value })
  }
></textarea>
        </div>
      </div>

      <div className="form-actions">
        <button
  className="secondary-button"
  onClick={() => {
    if (!newEvent.name.trim()) {
      alert("Please enter an event name.");
      return;
    }
    if (newEvent.date && new Date(newEvent.date) < new Date(new Date().toDateString())) {
  alert("Please select today or a future date.");
  return;
}
if (
  newEvent.maxParticipants &&
  Number(newEvent.maxParticipants) <= 0
) {
  alert("Maximum participants must be greater than zero.");
  return;
}

    const formattedDate = newEvent.date
  ? new Date(`${newEvent.date}T00:00:00`).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  : "TBD";

const draftDetails = {
  name: newEvent.name.trim(),
  category: newEvent.category || "Other",
  date: formattedDate,
  time: newEvent.time || "",
  venue: newEvent.venue.trim(),
  maxParticipants: newEvent.maxParticipants,
  description: newEvent.description.trim(),
  status: "Draft",
};

if (editingEvent) {
  setEvents((previousEvents) =>
    previousEvents.map((item) =>
      item === editingEvent
        ? { ...item, ...draftDetails }
        : item
    )
  );
  setEditingEvent(null);
} else {
  setEvents((previousEvents) => [
    ...previousEvents,
    { ...draftDetails, registrations: 0 },
  ]);
}

    setNewEvent({
      name: "",
      category: "",
      date: "",
      time: "",
      venue: "",
      maxParticipants: "",
      description: "",
    });

    alert("Event saved as draft!");
    setActivePage("My Events");
  }}
>
  Save Draft
</button>
       
<button
  className="secondary-button"
  onClick={() => {
   if (!newEvent.name.trim()) {
  alert("Please enter an event name.");
  return;
}

if (
  newEvent.date &&
  new Date(newEvent.date) < new Date(new Date().toDateString())
) {
  alert("Please select today or a future date.");
  return;
}

if (
  newEvent.maxParticipants &&
  Number(newEvent.maxParticipants) <= 0
) {
  alert("Maximum participants must be greater than zero.");
  return;
}

    const formattedDate = newEvent.date
      ? new Date(`${newEvent.date}T00:00:00`).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "TBD";


const eventDetails = {
  name: newEvent.name.trim(),
  category: newEvent.category || "Other",
  date: formattedDate,
  time: newEvent.time || "",
  venue: newEvent.venue.trim(),
  maxParticipants: newEvent.maxParticipants,
  description: newEvent.description.trim(),
  status: "Published",
};


    

if (editingEvent) {
  setEvents((previousEvents) =>
    previousEvents.map((item) =>
      item === editingEvent
        ? {
            ...item,
            ...eventDetails,
            date: formattedDate,
          }
        : item
    )
  );

  setEditingEvent(null);
  alert("Event updated successfully!");
} else {
  setEvents((previousEvents) => [
    ...previousEvents,
    {
      ...eventDetails,
      registrations: 0,
    },
  ]);

  alert("Event published successfully!");
}



    setNewEvent({
      name: "",
      category: "",
      date: "",
      time: "",
      venue: "",
      maxParticipants: "",
      description: "",
    });

    setActivePage("My Events");
  }}
>
  Publish Event
</button>

      </div>
    </div>
  </div>
);

  const renderParticipants = () => (
    <div>
      <div className="page-title">
        <div>
          <h1>Participants</h1>
          <p>View and manage event registrations.</p>
        </div>
        <button
  className="secondary-button"
  onClick={() => {
    const csv = [
      ["Name", "Email", "Status"],
      ...participants.map((person) => [
        person.name,
        person.email,
        person.status,
      ]),
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "campus-connect-participants.csv";
    link.click();
    URL.revokeObjectURL(url);
  }}
>
  ⬇ Export
</button>
      </div>

      <div className="card">
        <div className="search-box">
          🔍
         <input
  placeholder="Search participants..."
  value={participantSearch}
  onChange={(e) => setParticipantSearch(e.target.value)}
/>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Participant</th>
                <th>Event</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {participants
  .filter((person) =>
    `${person.name} ${person.email}`
      .toLowerCase()
      .includes(participantSearch.toLowerCase())
  )
  .map((person, index) => (
                <tr key={index}>
                  <td><strong>{person.name}</strong></td>
                  <td>{person.event}</td>
                  <td>
                    <span className="status published">{person.status}</span>
                  </td>
                  <td>
                    <button
  className="small-button"
  onClick={() => {
    setParticipants((previousParticipants) =>
      previousParticipants.map((item) =>
        item.name === person.name && item.event === person.event
          ? {
              ...item,
              status:
                item.status === "Attended" ? "Registered" : "Attended",
            }
          : item
      )
    );
  }}
>
  {person.status === "Attended" ? "Undo Attendance" : "Mark Present"}
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div>
      <div className="page-title">
        <div>
          <h1>Announcements</h1>
          <p>Keep students updated about your events.</p>
        </div>
        <button
  className="primary-button"
  onClick={() => setShowAnnouncementForm(true)}
>
  + New Announcement
</button>
{showAnnouncementForm && (
  <div className="form-card">
    <h3>Create Announcement</h3>

    <input
      type="text"
      placeholder="Announcement title"
      id="announcementTitle"
    />

    <textarea
      placeholder="Write your announcement..."
      id="announcementMessage"
      rows="4"
    />

    <select id="announcementAudience">
      <option value="All Students">All Students</option>
      <option value="Club Members">Club Members</option>
      <option value="Event Participants">Event Participants</option>
    </select>

    <div className="form-actions">
      <button
  className="secondary-button"
  onClick={() => {
    document.getElementById("announcementTitle").value = "";
    document.getElementById("announcementMessage").value = "";
    document.getElementById("announcementAudience").value = "All Students";
    setShowAnnouncementForm(false);
  }}
>
  Cancel
</button>

      <button
  className="primary-button"
  onClick={() => {
    const title = document.getElementById("announcementTitle").value;
    const message = document.getElementById("announcementMessage").value;
    const audience = document.getElementById("announcementAudience").value;

    if (!title.trim() || !message.trim()) {
      alert("Please enter an announcement title and message.");
      return;
    }

    const newAnnouncement = {
      title: title,
      message: message,
      audience: audience,
      date: "Today",
    };

    setAnnouncements((previousAnnouncements) => [
      newAnnouncement,
      ...previousAnnouncements,
    ]);

    alert("Announcement published successfully!");
    setShowAnnouncementForm(false);
  }}
>
  Publish Announcement
</button>
    </div>
  </div>
)}
      </div>

      <div className="card">
        <h2>Recent Announcements</h2>

        {announcements.map((announcement, index) => (
  <div className="announcement" key={index}>
    <div className="announcement-icon">📢</div>
    <div>
      <h3>{announcement.title}</h3>

      {announcement.message && (
        <p>{announcement.message}</p>
      )}

      <p>
        {announcement.audience} • {announcement.date}
      </p>
    </div>
    </div>
))}
      </div>
    </div>
  );

const renderAnalytics = () => (
    <div>
      <div className="page-title">
        <div>
          <h1>Analytics</h1>
          <p>Understand how your events are performing.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👀</div>
          <div>
            <p>Event Views</p>
            <h2>2,846</h2>
            <span className="positive">+12.5%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div>
            <p>Registrations</p>
<h2>
  {events.reduce(
    (total, event) => total + Number(event.registrations || 0),
    0
  )}
</h2>
<span>Total event registrations</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <p>Attendance Rate</p>
            <h2>84%</h2>
            <span className="positive">+6%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div>
            <p>Feedback Rating</p>
            <h2>4.6/5</h2>
            <span>Excellent</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Registration Trend</h2>
          <span>Last 6 months</span>
        </div>

        <div className="chart">
          <div className="bar" style={{ height: "35%" }}>
            <span>May</span>
          </div>
          <div className="bar" style={{ height: "48%" }}>
            <span>Jun</span>
          </div>
          <div className="bar" style={{ height: "58%" }}>
            <span>Jul</span>
          </div>
          <div className="bar" style={{ height: "72%" }}>
            <span>Aug</span>
          </div>
          <div className="bar" style={{ height: "64%" }}>
            <span>Sep</span>
          </div>
          <div className="bar" style={{ height: "90%" }}>
            <span>Oct</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div>
      <div className="page-title">
        <div>
          <h1>Feedback</h1>
          <p>See what students think about your events.</p>
        </div>
      </div>

      <div className="feedback-layout">
<div className="card rating-card">
  <h2>Overall Rating</h2>

  <div className="big-rating">
    {(
      feedbacks.reduce((total, feedback) => total + feedback.rating, 0) /
      (feedbacks.length || 1)
    ).toFixed(1)}
  </div>

  <div className="stars">
    {"★".repeat(
      Math.round(
        feedbacks.reduce((total, feedback) => total + feedback.rating, 0) /
        (feedbacks.length || 1)
      )
    )}
    {"☆".repeat(
      5 -
      Math.round(
        feedbacks.reduce((total, feedback) => total + feedback.rating, 0) /
        (feedbacks.length || 1)
      )
    )}
  </div>

  <p>Based on {feedbacks.length} responses</p>
</div>

        <div className="card">
          <h2>Student Comments</h2>

          {feedbacks.map((feedback, index) => (
  <div className="comment" key={index}>
    <strong>{feedback.name}</strong>
    <span>
      {"★".repeat(feedback.rating)}
      {"☆".repeat(5 - feedback.rating)}
    </span>
    <p>"{feedback.comment}"</p>
  </div>
))}

<button
  className="primary-button"
  onClick={() => setShowFeedbackForm(true)}
>
  + Collect Feedback
</button>
{showFeedbackForm && (
  <div className="form-card">
    <h3>Submit Student Feedback</h3>

    <input
      id="feedbackName"
      type="text"
      placeholder="Student name"
    />

    <select id="feedbackRating" defaultValue="5">
      <option value="5">★★★★★ - Excellent</option>
      <option value="4">★★★★☆ - Good</option>
      <option value="3">★★★☆☆ - Average</option>
      <option value="2">★★☆☆☆ - Poor</option>
      <option value="1">★☆☆☆☆ - Very Poor</option>
    </select>

    <textarea
      id="feedbackComment"
      placeholder="Write your feedback..."
      rows="4"
    />

    <div className="form-actions">
      <button
        className="secondary-button"
        onClick={() => setShowFeedbackForm(false)}
      >
        Cancel
      </button>

      <button
        className="primary-button"
onClick={() => {
  const name = document.getElementById("feedbackName").value;
  const comment = document.getElementById("feedbackComment").value;
  const rating = Number(
    document.getElementById("feedbackRating").value
  );

  if (!name.trim() || !comment.trim()) {
    alert("Please enter your name and feedback.");
    return;
  }

  const newFeedback = {
    name: name.trim(),
    rating: rating,
    comment: comment.trim(),
  };

  setFeedbacks((previousFeedbacks) => [
    newFeedback,
    ...previousFeedbacks,
  ]);

  alert("Feedback submitted successfully!");
  setShowFeedbackForm(false);
}}
      >
        Submit Feedback
      </button>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );


const renderProfile = () => (
  <div>
    <div className="page-title">
      <div>
        <h1>Profile & Settings</h1>
        <p>Manage your organizer profile.</p>
      </div>
    </div>

    <div className="card profile-card">
      <div className="profile-avatar">
        {profile.name.charAt(0).toUpperCase()}
      </div>

      <h2>Organizer</h2>
      <p>Campus Connect Organizer</p>

      <div className="profile-details">
        <div>
          <strong>Name</strong>
          <span>{profile.name}</span>
        </div>

        <div>
          <strong>Email</strong>
          <span>{profile.email}</span>
        </div>

        <div>
          <strong>Role</strong>
          <span>Event Organizer</span>
        </div>
      </div>

      <button
        className="primary-button"
        onClick={() => setShowProfileForm(true)}
      >
        Edit Profile
      </button>

      {showProfileForm && (
        <div className="form-card">
          <h3>Edit Organizer Profile</h3>

          <input
            id="profileName"
            placeholder="Organizer name"
            defaultValue={profile.name}
          />

          <input
            id="profileEmail"
            type="email"
            placeholder="Email address"
            defaultValue={profile.email}
          />

          <div className="form-actions">
            <button
              className="secondary-button"
              onClick={() => setShowProfileForm(false)}
            >
              Cancel
            </button>

            <button
              className="primary-button"
              onClick={() => {
                const name =
                  document.getElementById("profileName").value.trim();

                const email =
                  document.getElementById("profileEmail").value.trim();

                if (!name || !email || !email.includes("@")) {
                  alert("Please enter a valid name and email address.");
                  return;
                }

                const updatedProfile = { name, email };

setProfile(updatedProfile);
localStorage.setItem(
  "campusConnectProfile",
  JSON.stringify(updatedProfile)
);
                setShowProfileForm(false);
                alert("Profile updated successfully!");
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);


  const renderPage = () => {
    switch (activePage) {
      case "My Events":
        return renderMyEvents();
      case "Create Event":
        return renderCreateEvent();
      case "Participants":
        return renderParticipants();
      case "Announcements":
        return renderAnnouncements();
      case "Analytics":
        return renderAnalytics();
      case "Feedback":
        return renderFeedback();
      case "Profile & Settings":
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">C</div>
          <div>
            <h2>Campus Connect</h2>
            <span>Organizer</span>
          </div>
        </div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${
                activePage === item ? "active" : ""
              }`}
              onClick={() => setActivePage(item)}
            >
              <span>
                {item === "Dashboard" && "⌂"}
                {item === "My Events" && "📅"}
                {item === "Create Event" && "＋"}
                {item === "Participants" && "👥"}
                {item === "Announcements" && "📢"}
                {item === "Analytics" && "📊"}
                {item === "Feedback" && "⭐"}
                {item === "Profile & Settings" && "⚙"}
              </span>
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-box">
            <strong>Need Help?</strong>
            <p>Contact Campus Connect support.</p>
            <button>Get Support</button>
          </div>

          <div className="user-mini">
            <div className="avatar">O</div>
            <div>
              <strong>Organizer</strong>
              <span>Event Team</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            Campus Connect <span>/</span> {activePage}
          </div>

          <div className="top-actions">
            <button className="notification">🔔</button>
            <div className="top-avatar">O</div>
          </div>
        </header>

        <section className="content">{renderPage()}</section>
      </main>
    </div>
  );
}

export default App;