import * as React from "react"
import { Button, Input, TextArea, Toggle, ControlType } from "framer"

// Function to rename layers
function renameLayers(layers: Layer[], pattern: string, startNumber: number) {
    layers.forEach((layer, index) => {
        const newName = pattern.replace(/\$n/g, (startNumber + index).toString())
        layer.name = newName
    })
}

// Main component
function RenameLayers() {
    const [pattern, setPattern] = React.useState("layername-$n")
    const [startNumber, setStartNumber] = React.useState(1)

    const handleRename = () => {
        const selectedLayers = framer.currentPage.selection
        if (selectedLayers.length === 0) {
            framer.showUI({
                title: "Error",
                content: "Please select at least one layer to rename.",
            })
            return
        }
        renameLayers(selectedLayers, pattern, startNumber)
        framer.closePluginUI()
    }

    return (
        <div style={{ padding: "20px", width: "300px" }}>
            <TextArea
                value={pattern}
                onChange={(event) => setPattern(event.target.value)}
                placeholder="Enter rename pattern (use $n for number)"
                style={{ width: "100%", marginBottom: "10px" }}
            />
            <Input
                value={startNumber.toString()}
                onChange={(event) => setStartNumber(parseInt(event.target.value) || 1)}
                placeholder="Start number"
                style={{ width: "100%", marginBottom: "10px" }}
            />
            <Button
                onClick={handleRename}
                style={{ width: "100%" }}
            >
                Rename Layers
            </Button>
        </div>
    )
}

// Register the plugin
framer.plugins.registerUI("Rename Layers", RenameLayers)