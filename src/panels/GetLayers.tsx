import { Body, Button, Heading } from 'react-uxp-spectrum'
import { app } from 'photoshop'
import { useState } from 'react'

const GetLayers: React.FC = () => {
    const [names, setNames] = useState<string[]>([])

    const getAllLayerNames = () => {
        const allLayers = app.activeDocument.layers
        const allLayerNames = allLayers.map(layer => layer.name)
        const sortedNames = allLayerNames.sort()
        setNames(sortedNames)
    }

    return (
        <Body>
            <Heading>Layers</Heading>
            <ul>
                {
                    names.map((name) => (
                        <li key={name}>{name}</li>
                    ))
                }
            </ul>
            <Button onClick={getAllLayerNames}>
                Get All Layers
            </Button>
        </Body>
    )
}

export default GetLayers
