"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImagePlus, Upload, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import paymentQr from "../../../../data/payment.png";

const CHECKOUT_FORM_STORAGE_KEY = "cookie-checkout-form";

type PaymentStepProps = {
  orderId: number;
};

export default function PaymentStep({ orderId }: PaymentStepProps) {
  const router = useRouter();
  const { clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [pendingReceipt, setPendingReceipt] = useState<{ file: File; previewUrl: string } | null>(null);
  const [uploadedReceipt, setUploadedReceipt] = useState<{ name: string; previewUrl: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pendingPreviewRef = useRef<string | null>(null);
  const uploadedPreviewRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (pendingPreviewRef.current) URL.revokeObjectURL(pendingPreviewRef.current);
      if (uploadedPreviewRef.current && uploadedPreviewRef.current !== pendingPreviewRef.current) {
        URL.revokeObjectURL(uploadedPreviewRef.current);
      }
    };
  }, []);

  const closeReceiptModal = () => {
    if (pendingReceipt?.previewUrl && pendingReceipt.previewUrl !== uploadedReceipt?.previewUrl) {
      URL.revokeObjectURL(pendingReceipt.previewUrl);
    }
    pendingPreviewRef.current = null;
    setPendingReceipt(null);
    setReceiptModalOpen(false);
  };

  const confirmReceiptUpload = () => {
    if (!pendingReceipt) return;
    if (uploadedReceipt?.previewUrl && uploadedReceipt.previewUrl !== pendingReceipt.previewUrl) {
      URL.revokeObjectURL(uploadedReceipt.previewUrl);
    }
    uploadedPreviewRef.current = pendingReceipt.previewUrl;
    pendingPreviewRef.current = null;
    setUploadedReceipt({
      name: pendingReceipt.file.name,
      previewUrl: pendingReceipt.previewUrl,
    });
    setPendingReceipt(null);
    setReceiptModalOpen(false);
  };

  return (
    <>
      <div className="rounded-[1.8rem] border border-[#E6D9EA] bg-[#FFFCFF] p-5 text-center shadow-sm sm:p-6">
        <div className="mx-auto max-w-[360px] overflow-hidden rounded-[1.5rem] border border-[#D9CBE0] bg-white p-3 shadow-[0_12px_30px_rgba(112,60,120,0.10)]">
          <Image
            src={paymentQr}
            alt="PayNow QR code"
            className="h-auto w-full rounded-[1.1rem]"
            priority
          />
        </div>
        <p className="mt-4 text-lg font-semibold text-brown">Scan to pay with PayNow</p>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          完成付款后，请上传付款完的截图，我们会通过电话或者 WhatsApp 跟进确认订单，尽快送达给你。
        </p>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setReceiptModalOpen(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#7A1638] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(122,22,56,0.18)] transition hover:bg-[#64112D] hover:shadow-[0_14px_28px_rgba(122,22,56,0.24)]"
          >
            <Upload size={16} />
            上传付款凭证
          </button>
        </div>

        {uploadedReceipt ? (
          <div className="mt-5 rounded-2xl border border-[#E8DDEB] bg-white p-3 text-left shadow-sm">
            <p className="mb-3 text-sm font-semibold text-[#7A1638]">已上传付款凭证</p>
            <div className="overflow-hidden rounded-[1.1rem] border border-[#EFE5D8] bg-[#FFFDF8]">
              <img
                src={uploadedReceipt.previewUrl}
                alt="付款凭证预览"
                className="h-auto w-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">{uploadedReceipt.name}</p>
          </div>
        ) : null}

        <button
          type="button"
          disabled={submitting}
          onClick={() => {
            setSubmitting(true);
            clearCart();
            window.sessionStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY);
            router.push(`/order-confirmation/${orderId}`);
          }}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "处理中..." : "确认付款完成"}
        </button>
      </div>

      {receiptModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(43,24,16,0.52)] px-4 py-6">
          <div className="w-full max-w-lg rounded-[1.8rem] border border-[#EAD8C7] bg-white shadow-[0_28px_60px_rgba(43,24,16,0.25)]">
            <div className="flex items-center justify-between border-b border-[#F0E4D9] px-5 py-4 sm:px-6">
              <div>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl font-bold text-brown">上传付款凭证</h2>
                <p className="mt-1 text-sm text-[#8B6F52]">请选择付款截图，确认后会回到付款页面。</p>
              </div>
              <button
                type="button"
                onClick={closeReceiptModal}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6D8CB] text-[#7A1638] transition hover:bg-[#FFF8FB]"
                aria-label="关闭上传窗口"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[#CAA6C7] bg-[#FFFCFF] px-6 py-10 text-center transition hover:border-[#9B2A92] hover:bg-[#FFF8FE]"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F8EAF7] text-[#9B2A92]">
                  <ImagePlus size={24} />
                </div>
                <p className="text-base font-semibold text-brown">选择付款截图</p>
                <p className="mt-2 text-sm leading-6 text-gray-500">支持 PNG / JPG / JPEG，上传后点击确认即可。</p>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  if (pendingReceipt?.previewUrl && pendingReceipt.previewUrl !== uploadedReceipt?.previewUrl) {
                    URL.revokeObjectURL(pendingReceipt.previewUrl);
                  }
                  const previewUrl = URL.createObjectURL(file);
                  pendingPreviewRef.current = previewUrl;
                  setPendingReceipt({ file, previewUrl });
                }}
              />

              {pendingReceipt ? (
                <div className="rounded-2xl border border-[#EAD8C7] bg-[#FFFDF9] p-3">
                  <p className="mb-3 text-sm font-semibold text-[#7A1638]">待确认图片</p>
                  <div className="overflow-hidden rounded-[1rem] border border-[#EFE5D8]">
                    <img src={pendingReceipt.previewUrl} alt="待上传付款凭证" className="h-auto w-full object-cover" />
                  </div>
                  <p className="mt-3 text-xs text-gray-500">{pendingReceipt.file.name}</p>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#F0E4D9] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={closeReceiptModal}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#E0D1C2] px-5 py-3 text-sm font-semibold text-[#7A5535] transition hover:bg-[#FFFBF7]"
              >
                取消
              </button>
              <button
                type="button"
                disabled={!pendingReceipt}
                onClick={confirmReceiptUpload}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#7A1638] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#64112D] disabled:cursor-not-allowed disabled:opacity-50"
              >
                确认上传
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
