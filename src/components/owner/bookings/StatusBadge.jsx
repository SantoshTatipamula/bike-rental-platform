const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-600",
    approved: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600",
    completed: "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;