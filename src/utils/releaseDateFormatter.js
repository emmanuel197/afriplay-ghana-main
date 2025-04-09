// Sample release_date from the metadata object
const releaseDate = "2022-10-17T13:00:00.000Z";

// Function to format the date
const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);

    // Get the weekday, day, month, and year
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
}

export default formatReleaseDate
// // Usage
// const formattedDate = formatReleaseDate(releaseDate);
// console.log(formattedDate);  // Output will be like: Monday, 17 October 2022
