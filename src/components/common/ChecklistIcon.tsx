import QuadcopterIcon from 'mdi-material-ui/Quadcopter';
import SafetyGogglesIcon from 'mdi-material-ui/SafetyGoggles';

const ChecklistIcon = ({ checklist, size = 'large' }: { checklist: any; size?: 'small' | 'medium' | 'large' | 'inherit' }) => {
    switch (checklist.icon) {
        case 'goggles':
            return <SafetyGogglesIcon fontSize={size} />;
        case 'drone':
            return <QuadcopterIcon fontSize={size} />;
        default:
            return undefined;
    }
};

export default ChecklistIcon;
