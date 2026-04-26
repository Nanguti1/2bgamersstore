<?php

namespace App\Http\Controllers\Admin;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Orders/Index', [
            'orders' => Order::query()->with(['user', 'items.product', 'payment'])->latest()->paginate(20)->withQueryString(),
            'statuses' => array_map(static fn (OrderStatus $status): string => $status->value, OrderStatus::cases()),
        ]);
    }

    public function show(Order $order): Response
    {
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order->load(['user', 'address', 'items.product', 'payment']),
        ]);
    }

    public function edit(Order $order): Response
    {
        return Inertia::render('Admin/Orders/Edit', [
            'order' => $order->load(['user', 'address', 'items.product', 'payment']),
            'statuses' => array_map(static fn (OrderStatus $status): string => $status->value, OrderStatus::cases()),
        ]);
    }

    public function update(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', Rule::in(array_map(static fn (OrderStatus $status): string => $status->value, OrderStatus::cases()))],
        ]);

        $order->update([
            'status' => $validated['status'],
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Order updated successfully.']);

        return back();
    }

    public function destroy(Order $order): RedirectResponse
    {
        $order->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Order deleted successfully.']);

        return back();
    }
}
