import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"

interface AIGenerateButtonProps {
    onClick: () => void
    isGenerating: boolean
    isDisabled?: boolean
}

const AIGenerateButton = ({
    onClick,
    isGenerating,
    isDisabled = false
}: AIGenerateButtonProps) => {
    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClick}
            disabled={isGenerating || isDisabled}
            className="gap-2"
        >
            <Wand2 className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate with AI"}
        </Button>
    )
}

export default AIGenerateButton;
