export default function IconCard({
  iconPath,
  text,
}: {
  iconPath: string;
  text: string;
}) {
  return (
    <div class="flex items-center  mb-8">
      <img class="w-9 h-9" src={iconPath} alt={`icon untuk menuk ${text}`} />
      <h4 class="ms-2 text-[15px] font-extralight text-white">{text}</h4>
    </div>
  );
}
