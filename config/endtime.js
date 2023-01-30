const getEndTime = function(startTime, duration) {
    let time = startTime.split(":");
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    minutes += parseInt(duration);
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }
    if (hours >= 24) {
        hours = hours % 24;
    }if (minutes < 10) {
        minutes = "0" + minutes;
    }if (hours < 10) {
        hours = "0" + hours;
    }
    return hours + ":" + minutes;
}
export default getEndTime;