import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { financialIcons, socialIcons, utilityIcons, trendIcons } from '../../utils/Icons';
import Button from '../Button/Button';

interface IncomeItemProps {
    id: string | number;
    title: string;
    amount: number;
    date: string;
    category: string;
    description: string;
    deleteItem: (id: string | number) => void;
    indicatorColor: string;
    type: 'income' | 'expense';
}

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}: IncomeItemProps) {
    const categoryIcon = () => {
        switch (category) {
            case 'salary': return financialIcons.money;
            case 'freelancing': return socialIcons.freelance;
            case 'investments': return trendIcons.stocks;
            case 'stocks': return socialIcons.usersGroup;
            case 'bitcoin': return financialIcons.bitcoin;
            case 'bank': return financialIcons.card;
            case 'youtube': return socialIcons.youtube;
            case 'other': return utilityIcons.circle;
            default: return utilityIcons.circle;
        }
    };

    const expenseCatIcon = () => {
        switch (category) {
            case 'education': return utilityIcons.book;
            case 'groceries': return utilityIcons.food;
            case 'health': return utilityIcons.medical;
            case 'subscriptions': return utilityIcons.tv;
            case 'takeaways': return utilityIcons.takeaway;
            case 'clothing': return utilityIcons.clothing;
            case 'travelling': return socialIcons.freelance;
            case 'other': return utilityIcons.circle;
            default: return utilityIcons.circle;
        }
    };

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{financialIcons.dollar} {amount}</p>
                        <p>{utilityIcons.calendar} {dateFormat(date)}</p>
                        <p>{socialIcons.comment} {description}</p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon={utilityIcons.trash}
                            bPad="1rem"
                            bRad="50%"
                            bg="var(--primary-color)"
                            color="#fff"
                            iColor="#fff"
                            hColor="var(--color-green)"
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    );
}

const IncomeItemStyled = styled.div<{ indicator: string }>`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i {
            font-size: 2.6rem;
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5 {
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem;
