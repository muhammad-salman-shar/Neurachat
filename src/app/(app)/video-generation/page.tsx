
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { generateVideo } from "@/ai/flows/video-generation";

const defaultPrompt = "A cinematic, high-tech logo animation for the brand name 'NeuraSaMu'. The text appears in glowing neon gradient colors (deep blue, cyan, and gold), with smooth particle effects swirling around it. The background is a dark futuristic AI lab environment with soft moving light streaks. As the camera slowly zooms in, digital lines and circuits form around the text, and a holographic brain icon subtly glows above it. The animation ends with the text pulsing once and a golden light sweep passing through it, giving a premium, powerful AI brand look — ultra-realistic, 4K resolution, smooth 3D motion, cinematic lighting.";

export default function VideoGenerationPage() {
    const [prompt, setPrompt] = useState(defaultPrompt);
    const [videoDataUri, setVideoDataUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateVideo = async () => {
        setIsLoading(true);
        setError(null);
        setVideoDataUri(null);

        try {
            const result = await generateVideo({ prompt });
            setVideoDataUri(result.videoDataUri);
        } catch (e: any) {
            setError(e.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Logo Animation Generator</CardTitle>
                    <CardDescription>Use the prompt below to generate a cinematic logo animation for NeuraSaMu.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={8}
                        className="text-base"
                    />
                    <Button onClick={handleGenerateVideo} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                Generating... (this may take a minute)
                            </>
                        ) : (
                            "Generate Video"
                        )}
                    </Button>
                </CardContent>
            </Card>

            {error && (
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">Generation Failed</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                </Card>
            )}

            {videoDataUri && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Video</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <video controls autoPlay muted loop className="w-full rounded-lg">
                            <source src={videoDataUri} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
