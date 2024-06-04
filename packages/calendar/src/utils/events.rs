use google_calendar3::{api::Event, CalendarHub};

async fn add_event(hub: &mut CalendarHub<hyper::Client>, title: &str, start_time: &NaiveDateTime) {
    let mut event = Event::default();
    event.summary = Some(title.to_string());
    event.start = Some(/* convert NaiveDateTime to Google's format */);
    hub.events().insert(event, "primary").doit().await.unwrap();
}
