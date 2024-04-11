import { ReactNode } from "react";
import { Header } from "../_components/header";
import { getHeaderNavItems } from "@/lib/api/common";

export default async function Layout({ children }: { children: ReactNode}) {
  const headerNavItems = await getHeaderNavItems()
  return (
    <div>
      <Header headerNavItems={headerNavItems} />
      {children}
    </div>
  )
}
