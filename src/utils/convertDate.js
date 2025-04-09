const numToTime = t => {
    if (t.duration) {
        const time = t.duration;
        const formattedTime = new Date(time * 60 * 1000).toISOString().substr(11, 8);
        const hours = formattedTime.substr(0, 2)
        const minutes = formattedTime.substr(3, 2)
        const seconds = formattedTime.substr(6, 7)
        const readableTime = `${hours}h ${minutes}m ${seconds}s`
        return readableTime
    }

    return '0h 0m 0s'
}

export default numToTime