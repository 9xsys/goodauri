import { redirect } from "next/navigation";
import { siteConfig } from "@/site-config";

export default function RootPage() {
  redirect(`/${siteConfig.defaultLocale}`);
}
