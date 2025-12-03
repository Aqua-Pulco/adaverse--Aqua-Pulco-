

type Props = {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;  
}

export default function Button({onClick, children, disabled }: Props) {

    return (
        <button onClick={onClick} disabled={disabled}>{children}</button>
    )


}