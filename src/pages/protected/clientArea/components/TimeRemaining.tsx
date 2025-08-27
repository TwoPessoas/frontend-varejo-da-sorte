import { DATA_FINAL_CAMPANHA } from "../../../home/HomePage";

const TimeRemaining = () => {
  // Calcular tempo restante da campanha
  const getTimeRemaining = () => {
    const now = new Date();
    const endDate = new Date(DATA_FINAL_CAMPANHA);
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) return { expired: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes, expired: false };
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div>
      {timeRemaining && !timeRemaining.expired && (
        <div className="mt-4 lg:mt-0">
          <div className="bg-white/80 text-primary px-4 py-2 rounded-lg text-sm font-medium">
            ⏰ {timeRemaining.days}d {timeRemaining.hours}h{" "}
            {timeRemaining.minutes}m restantes
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRemaining;
