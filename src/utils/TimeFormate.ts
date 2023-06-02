const TimeFormate = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  return `${hours}h ${minutes}m`;
};

export default TimeFormate;
