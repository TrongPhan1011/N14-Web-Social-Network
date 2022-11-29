import { memo } from 'react';
import EmojiPicker, { EmojiStyle, SuggestionMode, Theme } from 'emoji-picker-react';

function PickerEmoji({ onChosseEmoji }) {
    return (
        <EmojiPicker
            onEmojiClick={onChosseEmoji}
            emojiStyle={EmojiStyle.NATIVE}
            theme={Theme.AUTO}
            autoFocusSearch={false}
            height={350}
            suggestedEmojisMode={SuggestionMode.RECENT}
            searchPlaceHolder="Tìm biểu tượng"
            previewConfig={{
                showPreview: false,
            }}
            // categories={[
            //     {
            //         name: 'Cảm xúc',
            //         category: Categories.SMILEYS_PEOPLE,
            //     },
            //     {
            //         name: 'Đối tượng',
            //         category: Categories.OBJECTS,
            //     },
            //     {
            //         name: 'Món ăn',
            //         category: Categories.FOOD_DRINK,
            //     },
            //     {
            //         name: 'Động vật',
            //         category: Categories.ANIMALS_NATURE,
            //     },
            //     {
            //         name: 'Biểu tượng',
            //         category: Categories.SYMBOLS,
            //     },
            //     {
            //         name: 'Hoạt động',
            //         category: Categories.ACTIVITIES,
            //     },

            //     {
            //         name: 'Cờ',
            //         category: Categories.FLAGS,
            //     },
            // ]}
        />
    );
}

export default memo(PickerEmoji);
