"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/homepageData";
import { SOFT_EASE } from "@/lib/scrollMotion";

export default function Scene5Modules() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#050B3A", paddingTop: 110, paddingBottom: 110 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,rgba(4,12,80,0.98) 0%,rgba(7,27,143,0.90) 42%,rgba(20,50,180,0.45) 66%,rgba(80,40,200,0.06) 100%)" }} />
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: SOFT_EASE }}
          className="mb-16 max-w-[640px]"
        >
          <p className="font-semibold uppercase mb-2" style={{ fontSize: 12, letterSpacing: "2.5px", color: "#60a5fa" }}>The Modules</p>
          <h2 className="text-white font-bold" style={{ fontSize: "clamp(28px,3.6vw,46px)", letterSpacing: "-1px" }}>
            Four disciplines, one accountable team.
          </h2>
        </motion.div>

        <div className="flex flex-col" style={{ gap: 80 }}>
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: SOFT_EASE }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <span
                  className="inline-block font-semibold uppercase mb-4 px-3 py-1 rounded-full"
                  style={{ fontSize: 11, letterSpacing: "2px", color: svc.from, border: `1px solid ${svc.from}55`, background: `${svc.from}12` }}
                >
                  0{i + 1}
                </span>
                <h3 className="text-white font-bold" style={{ fontSize: "clamp(22px,2.6vw,32px)", letterSpacing: "-0.5px" }}>{svc.title}</h3>
                <p className="mt-4 leading-relaxed" style={{ fontSize: 14.5, color: "rgba(255,255,255,0.6)", maxWidth: 480 }}>{svc.description}</p>
              </div>
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{ minHeight: 260, background: `linear-gradient(145deg,${svc.from}22,${svc.to}22)`, border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Image src={svc.img} alt={svc.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
