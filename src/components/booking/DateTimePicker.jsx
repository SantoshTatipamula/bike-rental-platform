const DateTimePicker = ({ date, setDate, time, setTime, hours, setHours }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="font-semibold">Select Date & Time</h2>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Date</label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2.5 rounded-lg cursor-pointer text-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Start Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border p-2.5 rounded-lg cursor-pointer text-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Duration (hours)</label>
        <input
          type="number"
          min="1"
          max="24"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full border p-2.5 rounded-lg text-sm"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
