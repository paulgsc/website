use chrono::NaiveDateTime;
use regex::Regex;

fn parse_datetime(text: &str) -> Option<NaiveDateTime> {
    let re = Regex::new(r"\b(\d{1,2}/\d{1,2}/\d{4})\s+(\d{1,2}:\d{2}\s*(?:AM|PM)?)\b").unwrap();
    re.captures(text).and_then(|cap| {
        let date = cap.get(1).unwrap().as_str();
        let time = cap.get(2).unwrap().as_str();
        NaiveDateTime::parse_from_str(&format!("{} {}", date, time), "%m/%d/%Y %I:%M %p").ok()
    })
}
