import {LoadingOutlined} from "@ant-design/icons";

interface loaderType {
    isLoading: boolean
}

export default function Loader( {isLoading}: loaderType ) {
    return (
        isLoading ? <div className={'loader'}><LoadingOutlined /></div> : null
    )
}
