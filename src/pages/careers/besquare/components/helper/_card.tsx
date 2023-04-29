import React, { useState } from 'react';
import {
    Bullet,
    CardWrapper,
    DropdownWrapper,
    IconWrapper,
    IconWrapperProps,
    ListContainer,
} from '../../static/style/_card';
import { TextWrapper } from '../../static/style/_common';
import { Minimize, Maximize } from '../../static/images/_what-lies-ahead';
import { slugify } from 'common/utility';

type CardWrapperProps = {
    grid_template_columns?: string[];
    grid_column_gap?: string[];
    border?: string;
    border_radius?: string;
    padding?: string[];
};

type TextWrapperProps = {
    max_width: string[];
};

type StyleProps = {
    text_wrapper: TextWrapperProps;
    icon_wrapper: IconWrapperProps;
    card_wrapper: CardWrapperProps;
};

type CustomIconProps = {
    src?: string;
    alt?: string;
};

type CardContentProps = {
    title?: string;
    subtitle?: string;
    text?: string | JSX.Element;
    src?: string;
    alt?: string;
    content?: string[];
};

type CardProps = {
    title_component?: React.ReactNode;
    has_list?: boolean;
    custom_icon?: CustomIconProps;
    card_content?: CardContentProps;
    style?: StyleProps;
};

const Card = ({ card_content, custom_icon, has_list, style, title_component }: CardProps) => {
    const [is_list_open, setIsListOpen] = useState(false);

    const getCurrentDropdownComponent = (class_name: string) => {
        const DropdownComponent = (
            <DropdownWrapper
                onClick={toggleIsListOpen}
                src={is_list_open ? Minimize : Maximize}
                alt=''
                width='32'
                height='32'
                className={class_name}
            />
        );
        if (is_list_open) {
            return (
                <React.Fragment>
                    {DropdownComponent}
                    <ListContainer>
                        {card_content.content.map((item, index) => (
                            <React.Fragment key={index}>
                                <Bullet>{'•'}</Bullet>
                                <TextWrapper max_width={['100%']}>{item}</TextWrapper>
                            </React.Fragment>
                        ))}
                    </ListContainer>
                </React.Fragment>
            );
        }
        return <React.Fragment>{DropdownComponent}</React.Fragment>;
    };

    const toggleIsListOpen = () => {
        setIsListOpen(!is_list_open);
    };

    const { card_wrapper, icon_wrapper, text_wrapper } = style;
    return (
        <CardWrapper {...card_wrapper}>
            <IconWrapper {...icon_wrapper} src={custom_icon?.src || card_content.src} alt={card_content?.alt} />
            {title_component}
            <TextWrapper {...text_wrapper}>{card_content.text}</TextWrapper>
            {has_list && getCurrentDropdownComponent(slugify(card_content.text))}
        </CardWrapper>
    );
};

export default Card;
