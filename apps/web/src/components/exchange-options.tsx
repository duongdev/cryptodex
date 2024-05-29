'use client'

import { ExchangeListResponseDataItem } from "@/lib/api/generated";
import { Exchange } from "@/lib/exchanges";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function getExchangeOptions(exchanges: ExchangeListResponseDataItem[]) {
  return exchanges.map(
    (exchange) => ({
      value: exchange.attributes?.slug as Exchange,
      label: exchange.attributes?.name!,
      icon: ({ className }: { className?: string }) => (
        <Image
          alt={exchange.attributes?.name!}
          className={cn('overflow-hidden rounded-md', className)}
          height={16}
          src={exchange.attributes?.logo.data?.attributes?.url!}
          width={16}
        />
      ),
    }),
  )
}