import $ from "jquery";

import "ui/html_editor";

const TOOLBAR_FORMAT_WIDGET_CLASS = "dx-htmleditor-toolbar-format";
const DROPDOWNMENU_CLASS = "dx-dropdownmenu-button";
const BUTTON_CONTENT_CLASS = "dx-button-content";

const { test } = QUnit;

QUnit.module("Toolbar integration", {
    beforeEach: () => {
        this.clock = sinon.useFakeTimers();
    },
    afterEach: () => {
        this.clock.restore();
    }
}, () => {
    test("Apply simple format without focus", (assert) => {
        $("#htmlEditor").dxHtmlEditor({
            value: "<p>test</p>",
            toolbar: { items: ["bold"] }
        });

        try {
            $("#htmlEditor")
                .find(`.${TOOLBAR_FORMAT_WIDGET_CLASS}`)
                .trigger("dxclick");
        } catch(e) {
            assert.ok(false, "error on formatting");
        }

        assert.ok(true);
    });

    test("Apply simple format with selection", (assert) => {
        const done = assert.async();
        const expected = "<p><strong>te</strong>st</p>";
        const instance = $("#htmlEditor").dxHtmlEditor({
            value: "<p>test</p>",
            toolbar: { items: ["bold"] },
            onValueChanged: (e) => {
                assert.equal(e.value, expected, "markup contains an image");
                done();
            }
        })
        .dxHtmlEditor("instance");

        instance.setSelection(0, 2);
        $("#htmlEditor")
            .find(`.${TOOLBAR_FORMAT_WIDGET_CLASS}`)
            .trigger("dxclick");
    });

    test("Overflow menu button should have a correct content", (assert) => {
        $("#htmlEditor").html("<p>test</p>").dxHtmlEditor({
            toolbar: { items: ["bold", { text: "test", showInMenu: "always" }] }
        });

        const buttonContent = $("#htmlEditor")
            .find(`.${DROPDOWNMENU_CLASS} .${BUTTON_CONTENT_CLASS}`)
            .html();
        const expectedContent = '<i class="dx-icon dx-icon-overflow"></i>';

        assert.equal(buttonContent, expectedContent);
    });
});
