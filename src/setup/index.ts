import { EventHandler, ReactElement } from 'react'
import { render } from 'react-dom'
import { entrypoints } from 'uxp'

interface UxpSize {
    width: number
    height: number
}

interface Dialog {
    id: string
    title?: string
    resize?: 'none' | 'both' | 'horizontal' | 'vertical'
    size?: UxpSize
    render: (close: () => void) => ReactElement
}

interface Command {
    id: string
    run: () => void
}

interface Panel {
    id: string
    render: () => ReactElement
}

interface SetupConfig {
    dialogs?: Dialog[]
    commands?: Command[]
    panels?: Panel[]
}

function setup(config: SetupConfig) {
    const dialogs = (config?.dialogs ?? []).reduce((acc, dialog) => {
        return {
            ...acc,
            ...createDialog(dialog)
        }
    }, {})

    const commands = (config?.commands ?? []).reduce((acc, command) => {
        return {
            ...acc,
            ...createCommand(command)
        }
    }, {})

    const panels = (config?.panels ?? []).reduce((acc, panel) => {
        return {
            ...acc,
            ...createPanel(panel)
        }
    }, {})

    entrypoints.setup({
        plugin: {
            create: () => console.log('Plugin Created'),
            destroy: () => console.log('Plugin Destroyed'),
        },
        commands: {
            ...dialogs,
            ...commands
        },
        panels
    })
}

function createDialog({ id, title, size, resize, render: renderElement }: Dialog) {
    const cancel = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.getElementById(id)?.close()
        document.getElementById(id)?.remove()
    }

    return {
        [id]: {
            run: () => {
                const root = document.createElement('dialog')
                root.id = id
                document.body.appendChild(root)
                render(renderElement(cancel), root)

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                root.showModal({
                    title: title ?? id,
                    size: size ?? { width: 500, height: 500 },
                    resize: resize ?? 'none',
                })
            },
            cancel
        }
    }
}


function createCommand({ id, run }: Command) {
    return {
        [id]: {
            run
        }
    }
}

function createPanel({ id, render: renderElement }: Panel) {
    let root: HTMLDivElement
    let attachment: HTMLElement

    const create = () => {
        root = document.createElement('div')
        root.id = id

        render(renderElement(), root)
    }
    return {
        [id]: {
            create: create,
            show: (event: {node: HTMLElement}) => {
                create()
                event.node.appendChild(root)
                attachment = event.node
            },
            hide: () => {
                attachment?.removeChild(root)
                attachment?.remove()
            }
        }
    }
}

export default setup
