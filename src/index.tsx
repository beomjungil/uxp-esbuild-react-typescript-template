import App from './panels/About'
import setup from './setup'
import uxp from 'uxp'

import './index.css'
import GetLayers from './panels/GetLayers'

setup({
    dialogs: [
        {
            id: 'about',
            title: 'About',
            size: { width: 320, height: 420 },
            resize: 'both',
            render: (close) => <App close={close} />,
        }
    ],
    commands: [
        {
            id: 'openFile',
            run: () => { uxp.dialog.showOpenDialog({}) },
        }
    ],
    panels: [
        {
            id: 'getLayers',
            render: () => <GetLayers />
        }
    ]
})