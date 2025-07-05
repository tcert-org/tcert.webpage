export type Country = {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
};

export const countries: Country[] = [
  { code: "CO", name: "Colombia", dial_code: "+57", flag: "🇨🇴" },
  { code: "AF", name: "Afghanistan", dial_code: "+93", flag: "🇦🇫" },
  { code: "AL", name: "Albania", dial_code: "+355", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", dial_code: "+213", flag: "🇩🇿" },
  { code: "AR", name: "Argentina", dial_code: "+54", flag: "🇦🇷" },
  { code: "AU", name: "Australia", dial_code: "+61", flag: "🇦🇺" },
  { code: "BR", name: "Brazil", dial_code: "+55", flag: "🇧🇷" },
  { code: "CN", name: "China", dial_code: "+86", flag: "🇨🇳" },
  { code: "EC", name: "Ecuador", dial_code: "+593", flag: "🇪🇨" },
  { code: "FR", name: "France", dial_code: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Germany", dial_code: "+49", flag: "🇩🇪" },
  { code: "IN", name: "India", dial_code: "+91", flag: "🇮🇳" },
  { code: "IT", name: "Italy", dial_code: "+39", flag: "🇮🇹" },
  { code: "JP", name: "Japan", dial_code: "+81", flag: "🇯🇵" },
  { code: "MX", name: "Mexico", dial_code: "+52", flag: "🇲🇽" },
  { code: "PE", name: "Peru", dial_code: "+51", flag: "🇵🇪" },
  { code: "ES", name: "Spain", dial_code: "+34", flag: "🇪🇸" },
  { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dial_code: "+1", flag: "🇺🇸" },
  { code: "VE", name: "Venezuela", dial_code: "+58", flag: "🇻🇪" },
];
