const { questionModal } = require("./_modal");

module.exports = {
    execute: async (interaction) => {
        
        await interaction.showModal(questionModal);

    }
}