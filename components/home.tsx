'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IconCloud from './icon-cloud';
import { icons } from '../config/icons';
import { layouts, selectedCard } from "@/config/layout";
import { Tab, Tabs } from "@heroui/react";
import { Responsive } from "react-grid-layout";
import useWindowWidth from "@/hooks/useWindowWidth";
import { cn } from "@/lib/utils";

import AvatarTransition from "@/components/avatar";
import { ThemeSwitch } from "@/components/theme-switch";
import AnimatedEmoji from "@/components/animated-emoji";
import MapComponent from "@/components/map";
import WebAgent from "@/components/webagent";
import Actions from "@/components/actions";
import Paper from "@/components/paper";


interface HomeProps {

    avatarUrl: string;
    asukaUrl: string;
    webagentUrl: string;
    actionImageUrl: string;
    paperUrl: string;

}

const Home = ({
    avatarUrl,
    asukaUrl,
    webagentUrl,
    actionImageUrl,
    paperUrl,


}: HomeProps) => {
    const width = useWindowWidth();
    const [tabSelected, setTabSelected] = useState("all");

    const router = useRouter();
    useEffect(() => {
        router.prefetch("/blog");
    }, [router]);

    if (!width) {
        return null;
    }

    return (
        <div className="flex justify-center flex-col items-center">
            <Tabs
                aria-label="Tabs"
                className="mb-2 md:mb-6 rounded-full"
                classNames={{
                    cursor: "shadow-none",
                    tabList:
                        "bg-[#ece7e7] dark:bg-darkBg border-2 border-transparent dark:border-knight rounded-full",
                }}
                motionProps={{
                    initial: { scale: 0.8 },
                    animate: { scale: 1 },
                    exit: { scale: 0.8 },
                    transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                radius={"full"}
                onSelectionChange={(selected) => {
                    if (selected === "blog") {
                        router.push("/blog");

                        return;
                    }
                    setTabSelected(selected as string);
                }}

            >
                <Tab key="all" title="All" />
                <Tab key="about" title="About" />
                <Tab key="projects" title="Projects" />
                <Tab key="blog" title="Blog" />
            </Tabs>

            <Responsive
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                className="layout w-full h-full"
                cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
                isDraggable={width > 480}
                isResizable={false}
                layouts={layouts[tabSelected]}
                margin={[15, 15]}
                width={width}
            >
                <div
                    key="avatar"
                    className={cn(
                        "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex flex-col justify-between p-5 overflow-hidden z-[1]",
                        selectedCard[tabSelected]["avatar"] ? "opacity-100" : "opacity-50"
                    )}
                >
                    <AvatarTransition avatarUrl={avatarUrl} asukaUrl={asukaUrl} />
                    <p className="text-sm md:text-medium">
                        Hey! I&apos;m <span className="font-oleo text-2xl"> Kesheng</span>, a
                        Full-stack Web Developer, hailing from University of Cologne. Currently, I&apos;m
                        building a cool marketing product. My world revolves around web
                        development.
                    </p>

                </div>
                <div
                    key="themeSwitch"
                    className={cn(
                        "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
                        selectedCard[tabSelected]["themeSwitch"]
                            ? "opacity-100"
                            : "opacity-50"
                    )}
                >
                    <ThemeSwitch />
                </div>


                <div
                    key="animatedEmoji"
                    className={cn(
                        "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
                        selectedCard[tabSelected]["animatedEmoji"]
                            ? "opacity-100"
                            : "opacity-50"
                    )}
                >
                    <AnimatedEmoji />
                </div>

                {/*map component*/}
                <div
                    key="mapComponent"
                    className={cn(
                        "bg-white dark:bg-darkBg cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
                        selectedCard[tabSelected]["mapComponent"]
                            ? "opacity-100"
                            : "opacity-50"
                    )}
                >
                    <MapComponent />
                </div>

                {/*icon cloud component*/}
                <div
                    key="iconCloud"
                    className={cn(
                        "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center relative overflow-hidden p-10 md:p-8 z-[1]",
                        selectedCard[tabSelected]["iconCloud"]
                            ? "opacity-100"
                            : "opacity-50"
                    )}
                >
                    <IconCloud iconSlugs={icons} />
                </div>

                {/*intelligence speed component*/}
                <div
                    key="webAgent"
                    className={cn(
                        "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center overflow-hidden z-[1]",
                        selectedCard[tabSelected]["webAgent"] ? "opacity-100" : "opacity-50"
                    )}
                >
                    <WebAgent webAgentUrl={webagentUrl} />
                </div>





                {/*actions component*/}
                <div
                    key="actions"
                    className={cn(
                        "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center overflow-hidden z-[1]",
                        selectedCard[tabSelected]["actions"] ? "opacity-100" : "opacity-50"
                    )}
                >
                    <Actions photoUrl={actionImageUrl} />
                </div>

                {/*paper component*/}
                <div
                    key="paper"
                    className={cn(
                        "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1] overflow-hidden",
                        selectedCard[tabSelected]["paper"] ? "opacity-100" : "opacity-50"
                    )}
                >
                    <Paper paperUrl={paperUrl} />
                </div>



            </Responsive>
        </div>
    );
};

export default Home;