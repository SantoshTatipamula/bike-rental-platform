const DateTimePicker = ({ date, setDate, time, setTime, hours, setHours }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="font-semibold">Select Date & Time</h2>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded-lg cursor-pointer" />

      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full border p-2 rounded-lg cursor-pointer" />

      <input type="number" min="1" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full border p-2 rounded-lg" />
    </div>
  );
};

export default DateTimePicker;