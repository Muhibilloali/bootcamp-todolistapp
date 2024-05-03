const handleProfilePhoto = (e) => {
    const selected = e.target.files[0];
    const isValid = validTypes.includes(selected.type);
    const vlaidSize = getvalidPhotoSize(selected.size);
    if (!isValid) {
        setError("Please select a valid Image");
        setFile(null);
    } else if (!vlaidSize && isValid) {
        setError("Image size must be less than 500KB");
        setFile(null);
    } else if (isValid && vlaidSize) {
        setFile(selected);
        setError("");
    }
};