import { Button, Detail, Divider, Heading } from 'react-uxp-spectrum'
import packageJson from '../../package.json'

const About: React.FC<{close: () => void}> = ({ close }) => {
    return (
        <div className="flex flex-col justify-between items-center w-full h-full">
            <Heading>{packageJson.name}</Heading>
            <Divider />
            <Detail className="bg-black bg-opacity-10 rounded-md p-4 mt-2">
                {packageJson.description}
            </Detail>
            <Detail className="mt-2">Version: {packageJson.version}</Detail>
            <div className="flex-1" />
            <div className="flex w-full justify-end">
                <Button onClick={close}>
                    Close
                </Button>
            </div>
        </div>
    )
}

export default About
