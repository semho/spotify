import { Check } from '@mui/icons-material';
import { StepIconProps, styled } from '@mui/material';
import React from 'react'

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
        color: '#1976d2',
        }),
        '& .QontoStepIcon-completedIcon': {
        color: '#1976d2',
        zIndex: 1,
        fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        },
    }),
);
    
function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
    
    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
            <Check className="QontoStepIcon-completedIcon" />
        ) : (
            <div className="QontoStepIcon-circle" />
        )}
        </QontoStepIconRoot>
    );
}
    
export default QontoStepIcon
