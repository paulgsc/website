use tesseract_rs::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut api = TessApi::new(None, "eng")?;
    api.set_image_from_file("invoice.jpg")?;
    let text = api.get_utf8_text()?;
    println!("{}", text);
    Ok(())
}
