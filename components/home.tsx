'use client';

import { useState ,useEffect} from 'react';
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
import CardStack from "@/components/card-stack";
import AnimatedEmoji from "@/components/animated-emoji";
import MapComponent from "@/components/map";
import WebAgent from "@/components/webagent";
import Chatbot from "@/components/chatbot";
import { MiniModel } from "@/components/mini";
import { AnimationSwitch } from "@/components/animation-swith";
import MiniPic from "@/components/mini-pic";
import Actions from "@/components/actions";
import Paper from "@/components/paper";


interface HomeProps {

    avatarUrl: string;
    resumeUrl: string;
    asukaUrl: string;
    photos: string[];
    webagentUrl: string;
    chatbotUrl: string;
    actionImageUrl: string;
    paperUrl: string;

}

const Home = ({
    photos,
    avatarUrl,
    asukaUrl,
    webagentUrl,
    chatbotUrl,
    actionImageUrl,
    paperUrl,


}: HomeProps) => {
    const width = useWindowWidth();
    const [tabSelected, setTabSelected] = useState("all");
    const [animated, setAnimated] = useState(false);
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
                        Hey! I’m <span className="font-oleo text-2xl"> Eric</span>, a
                        software engineer, hailing from UCLA and Purdue. Currently, I’m
                        building a cool marketing product. My world revolves around web
                        development. And yes, I have an adorable dog named Bert!
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
                    key="cardStack"
                    className={cn(
                        "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[2]",
                        selectedCard[tabSelected]["cardStack"]
                            ? "opacity-100"
                            : "opacity-50"
                    )}
                >
                    <CardStack photos={photos} />
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

                {/*chatbot component*/}
                <div
                    key="chatBot"
                    className={cn(
                        "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center overflow-hidden z-[1]",
                        selectedCard[tabSelected]["chatBot"] ? "opacity-100" : "opacity-50"
                    )}
                >
                    <Chatbot chatbotUrl={chatbotUrl} />
                </div>

                {/*mini model component*/}
                <div
                    key="miniModel"
                    className={cn(
                        "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1] overflow-hidden",
                        selectedCard[tabSelected]["miniModel"]
                            ? "opacity-100"
                            : "opacity-50"
                    )}
                >
                    {animated ? <MiniModel /> : <MiniPic />}
                    <AnimationSwitch
                        animated={animated}
                        className="absolute top-4 right-4 z-50"
                        setAnimated={setAnimated}
                    />
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