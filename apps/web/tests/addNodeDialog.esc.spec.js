import { jsx as _jsx } from "react/jsx-runtime";
// apps/web/tests/addNodeDialog.esc.spec.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import AddNodeDialog from '../src/components/AddNodeDialog';
it('closes on Escape', () => {
    const onClose = vi.fn();
    render(_jsx(AddNodeDialog, { open: true, onClose: onClose, onSubmit: () => { } }));
    const input = screen.getByLabelText(/skill name/i);
    input.focus();
    // Either target the focused input...
    fireEvent.keyDown(input, { key: 'Escape' });
    // ...or the document (matches your document-level listener)
    // fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled();
});
