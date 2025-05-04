export default function DataCard({
  sensorValue,
  sensorType,
  sensorDescription,
  iconPath,
}: {
  sensorValue: string;
  sensorType: string;
  sensorDescription: string;
  iconPath: string;
}) {
  return (
    <div class="w-full h-32 rounded-md p-[0.5px] bg-gradient-to-tr from-transparent via-transparent to-white/50">
      <div class="grid grid-cols-5 h-full bg-gradient-to-tr from-slate-700 via-slate-800 to-slate-950 p-2 rounded-md">
        <div class="col-span-3 my-auto">
          <h3 class="text-white font-medium text-4xl">{sensorValue}</h3>
          <p class="text-white text-xs font-extralight mb-5">
            {sensorType} Sensor
          </p>
          <hr class="border-[#C2C0C0] border-[0.5px] mb-1" />
          <p class="text-[#C2C0C0] text-xs">{sensorDescription}</p>
        </div>
        <img
          class="w-full aspect-square col-span-2 my-auto"
          src={iconPath}
          alt=""
        />
      </div>
    </div>
  );
}
