import { BadRequestException } from '@nestjs/common';

export class ValidationUtil {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^(\+44|0)[1-9]\d{8,9}$/;
    return phoneRegex.test(phone);
  }

  static validatePostcode(postcode: string): boolean {
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode);
  }

  static sanitizeString(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  static validatePrice(price: number): void {
    if (price < 0) {
      throw new BadRequestException('Price cannot be negative');
    }
    if (price > 10000) {
      throw new BadRequestException('Price cannot exceed £10,000');
    }
  }

  static validateQuantity(quantity: number): void {
    if (quantity < 0) {
      throw new BadRequestException('Quantity cannot be negative');
    }
    if (quantity > 1000) {
      throw new BadRequestException('Quantity cannot exceed 1,000');
    }
  }
}
