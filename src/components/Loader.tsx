import {LoadingOutlined} from "@ant-design/icons";

export default function Loader({isLoading}) {
    return (
        isLoading && <div className={'loader'}><LoadingOutlined /></div>
    )
}
